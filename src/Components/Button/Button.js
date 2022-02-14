import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { typography } from '../../Shared/styles';

const StyledButton = styled.button`
  border: none;
  background: #121010;
  box-shadow: 0px 0px 8px 1px #616161 inset, 3px 0px 1px 0.5px black, 1.5px 1.5px 1px 0.5px black;
  font-size: 1em;
  font-family: ${typography.type.primary};
  padding: 5px;
  width: 4em;
  height: 4em;
  margin-top: 10px;
  line-height: 10px;
  color: white;
  text-align: center;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  ${(props) =>
    props.power &&
    `height: 2em;
    width: 2em;
    background: #212121;
    box-shadow: 0px 0px 2px 0.2px #616161 inset, 2.5px 0px 1px 0.5px black, 1.5px 1px 1px 0.5px black;`}
`;
// const Audio = <audio muted={mute} id={id} src={clip.src} ref={}></audio>;

/**
 * The Button Format
 */

export const Button = ({ isDisabled, id, key, index, ...props }) => {
  // console.log('props: ', props);
  return (
    <StyledButton disabled={isDisabled} id={id} key={key} index={index} {...props}>
      {id}
    </StyledButton>
  );
};

Button.propTypes = {
  isDisabled: PropTypes.bool,
  /** The id of the clip */
  id: PropTypes.string.isRequired,
  /** The id of the clip */
  key: PropTypes.string.isRequired,
  /** The id of the clip */
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  isDisabled: false,
  index: 1,
  id: 'Test',
  key: 'Test',
  onClick: undefined,
};
