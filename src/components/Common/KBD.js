import styled from 'styled-components';

// https://www.rgagnon.com/jsdetails/js-nice-effect-the-KBD-tag.html#:~:text=Nice%20effect%20with%20the%20KBD%20tag%20Tag(s)%3A%20HTML,to%20provide%20a%20better%20look.
const KBD = styled.kbd`
  margin: 0px 0.1em;
  padding: 0.1em 0.6em;
  border-radius: 3px;
  border: 1px solid rgb(204, 204, 204);
  color: rgb(51, 51, 51);
  line-height: 1.4;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  display: inline-block;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 2px #ffffff;
  background-color: rgb(247, 247, 247);
  -moz-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #ffffff inset;
  -webkit-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #ffffff inset;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  text-shadow: 0 1px 0 #fff;
  margin-bottom: -3px;
`;

export default KBD;
