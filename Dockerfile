# Thanks https://pythonspeed.com/articles/activate-conda-dockerfile/

FROM continuumio/miniconda3

WORKDIR /app

# Create the environment
COPY environment.yml .
RUN conda env create -f environment.yml

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "covid-cg", "/bin/bash", "-c"]

# Make sure the environment is activated:
RUN echo "Make sure pandas is installed:"
RUN python -c "import pandas"