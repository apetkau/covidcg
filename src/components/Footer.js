import React from 'react';
import { useStores } from '../stores/connect';
import styled from 'styled-components';

import { version } from '../utils/version';

import ExternalLink from './Common/ExternalLink';

const FooterContainer = styled.div`
  flex-shrink: 0;

  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f8f8f8;

  margin-left: -10px;
  padding: 5px;
  padding-left: 20px;
  border-top: 1px solid #ccc;

  font-size: 0.85rem;

  .gisaid-daa {
    // margin-right: 10px;
    padding-right: 5px;
    // border-right: 1px solid #aaa;
  }
`;

const Version = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 10px;
  margin-left: 8px;

  border-left: 1px solid #aaa;

  font-size: 0.9em;
  font-weight: normal;
  color: #666666;

  .version {
    line-height: normal;
    margin-bottom: 2px;
    span.version-num {
      font-weight: bold;
    }

    a {
      margin-left: 3px;
    }
  }
  .data-date {
    line-height: normal;
    span.date {
      font-weight: bold;
    }
  }
`;

const Footer = () => {
  const { dataStore } = useStores();

  return (
    <FooterContainer>
      <div className="gisaid-daa">
        GISAID data provided on this website are subject to GISAID’s{' '}
        <ExternalLink href="https://www.gisaid.org/registration/terms-of-use/">
          Terms and Conditions
        </ExternalLink>
      </div>
      <Version>
        <div className="version">
          Version: <span className="version-num">{version}</span>{' '}
          <ExternalLink href="https://github.com/vector-engineering/covidcg/releases">
            (Changelog)
          </ExternalLink>
          <ExternalLink href="https://github.com/vector-engineering/covidcg">
            [GitHub]
          </ExternalLink>
        </div>
        <div className="data-date">
          <b>{dataStore.numSequences}</b> Sequences Analyzed (Up to{' '}
          <span className="date">{dataStore.dataDate}</span>)
        </div>
      </Version>
    </FooterContainer>
  );
};

export default Footer;
