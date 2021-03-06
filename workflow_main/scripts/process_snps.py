# coding: utf-8

"""Load SNP data, create SNP signatures

Author: Albert Chen - Vector Engineering Team (chena@broadinstitute.org)
"""

import io
import numpy as np
import pandas as pd


def process_snps(
    snp_files,
    # SNPs must occur at least this many times to pass filters
    count_threshold=3,
    mode="dna",  # dna, gene_aa, protein_aa
):

    # Dump all SNP chunks into a text buffer
    snp_df_io = io.StringIO()
    for i, chunk in enumerate(snp_files):
        with open(chunk, "r") as fp_in:
            for j, line in enumerate(fp_in):
                # Write the header of the first file
                # Or write any line that's not the header
                # (to avoid writing the header more than once)
                if (i == 0 and j == 0) or j > 0:
                    snp_df_io.write(line)

    # Read the buffer into a dataframe, then discard the buffer
    snp_df_io.seek(0)
    snp_df = pd.read_csv(snp_df_io)
    snp_df_io.close()

    snp_df = snp_df.fillna("-")

    groupby_cols = ["pos", "ref", "alt"]
    if mode == "gene_aa":
        groupby_cols.insert(0, "gene")
    elif mode == "protein_aa":
        groupby_cols.insert(0, "protein")

    # Collapse by Accession ID and count occurrences
    snp_count_df = (
        snp_df.groupby(groupby_cols, as_index=False)
        .count()
        .rename(columns={"Accession ID": "count"})
    )

    # Filter out low global occurrence SNPs
    valid_snps = (
        snp_count_df.loc[snp_count_df["count"] >= count_threshold, :]
        .reset_index(drop=True)
        .sort_values("count", ascending=False)
    )
    # Create unique SNP string
    valid_snps["snp_str"] = valid_snps[groupby_cols].applymap(str).agg("|".join, axis=1)

    # Generate SNP strings for initial dataframes
    # e.g., for DNA, its pos|ref|alt
    snp_df["snp_str"] = (
        snp_df[groupby_cols[0]]
        .astype(str)
        .str.cat([snp_df[col].astype(str) for col in groupby_cols[1:]], sep="|")
    )
    # Filter SNPs by valid SNPs
    snp_df = snp_df.loc[snp_df["snp_str"].isin(valid_snps["snp_str"]), :].reset_index(
        drop=True
    )
    # Group by Accession ID and make a ';' delimited list of snp_strs
    snp_group_df = snp_df.groupby("Accession ID")["snp_str"].agg(";".join).reset_index()

    # Map SNPs to integer IDs
    snp_map = pd.Series(
        np.unique(np.concatenate(snp_group_df["snp_str"].str.split(";").values).ravel())
    )

    # Flip index and values
    snp_map = pd.Series(snp_map.index.values, index=snp_map.values)

    # Convert SNP strings to integer lists
    snp_group_df["snp_str"] = (
        snp_group_df["snp_str"]
        .str.split(";")
        .apply(lambda x: ";".join([str(snp_map[a]) for a in x] if x else None))
    )

    return snp_group_df.set_index("Accession ID"), snp_map
