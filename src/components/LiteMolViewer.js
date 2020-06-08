import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import LiteMol from 'litemol';
import './../styles/litemol.min.css';

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
  height: 100%;
`;

const Visualization = LiteMol.Visualization;
const Core = LiteMol.Core;
const Bootstrap = LiteMol.Bootstrap;
const Q = Core.Structure.Query;
const Transformer = Bootstrap.Entity.Transformer;
const Query = LiteMol.Core.Structure.Query;
const Plugin = LiteMol.Plugin;

const Command = Bootstrap.Command;

class ColorMapper {
  uniqueColors = [];
  map = Core.Utils.FastMap.create();

  get colorMap() {
    const map = Core.Utils.FastMap.create();
    this.uniqueColors.forEach((c, i) => map.set(i, c));
    return map;
  }

  addColor(color) {
    const id = `${color.r}-${color.g}-${color.b}`;
    if (this.map.has(id)) return this.map.get(id);
    const index = this.uniqueColors.length;
    this.uniqueColors.push(
      Visualization.Color.fromRgb(color.r, color.g, color.b)
    );
    this.map.set(id, index);
    return index;
  }
}

export function createTheme(model, colorDef) {
  const mapper = new ColorMapper();
  mapper.addColor(colorDef.base);
  const map = new Uint8Array(model.data.atoms.count);

  for (const e of colorDef.entries) {
    const query = Q.sequence(
      e.entity_id.toString(),
      e.struct_asym_id,
      { seqNumber: e.start_residue_number },
      { seqNumber: e.end_residue_number }
    ).compile();
    const colorIndex = mapper.addColor(e.color);
    for (const f of query(model.queryContext).fragments) {
      for (const a of f.atomIndices) {
        map[a] = colorIndex;
      }
    }
  }

  const fallbackColor = { r: 0.6, g: 0.6, b: 0.6 };
  const selectionColor = { r: 0, g: 0, b: 1 };
  const highlightColor = { r: 1, g: 0, b: 1 };

  const colors = Core.Utils.FastMap.create();
  colors.set('Uniform', fallbackColor);
  colors.set('Selection', selectionColor);
  colors.set('Highlight', highlightColor);

  const mapping = Visualization.Theme.createColorMapMapping(
    (i) => map[i],
    mapper.colorMap,
    fallbackColor
  );
  // make the theme "sticky" so that it persist "ResetScene" command.
  return Visualization.Theme.createMapping(mapping, { colors, isSticky: true });
}

export function applyTheme(plugin, modelRef, theme) {
  const visuals = plugin.selectEntities(
    Bootstrap.Tree.Selection.byRef(modelRef)
      .subtree()
      .ofType(Bootstrap.Entity.Molecule.Visual)
  );
  for (const v of visuals) {
    plugin.command(Bootstrap.Command.Visual.UpdateBasicTheme, {
      visual: v,
      theme,
    });
  }
}

const LiteMolViewer = React.memo(() => {
  const target = useRef();
  const plugin = useRef();

  const selectNodes = (what) => {
    console.log(plugin.current.context);
    return plugin.current.context.select(what);
  };

  const colorSequences = () => {
    let model = selectNodes('model')[0];
    console.log(model);
    if (!model) return;
    let query = Query.sequence(
      '1',
      'A',
      { seqNumber: 100 },
      { seqNumber: 300 }
    );
    Command.Molecule.Highlight.dispatch(plugin.context, {
      model,
      query,
      isOn: true,
    });
  };

  useLayoutEffect(() => {
    console.log(target.current);
    plugin.current = LiteMol.Plugin.create({
      target: target.current,
      layoutState: {
        hideControls: true,
        collapsedControlsLayout:
          LiteMol.Bootstrap.Components.CollapsedControlsLayout.Landscape,
      },
      viewportBackground: '#F1F1F1',
    });
    console.log('yo: ', plugin.current, plugin.current.loadMolecule);
    plugin.current.loadMolecule({
      id: '6x2a',
      url: 'https://files.rcsb.org/download/6X2A.pdb',
      format: 'pdb', // default
    });
  });

  return (
    <Container>
      <button onClick={colorSequences}>hightlight test</button>
      <div
        style={{ width: '100%', height: '100%' }}
        id={`${Math.random()}-litemolViewer`}
        ref={target}
      />
    </Container>
  );
});

export default LiteMolViewer;
