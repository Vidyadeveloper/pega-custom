// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0; // No need for 'px' when setting zero margins
  `;
});

export const StyledDetailsGridContainer = styled.div(() => {
  return css`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Ensures two columns in each row
    grid-template-rows: repeat(2, auto); // Creates two rows
    gap: 1rem;
    margin-inline-start: 1rem; // Adjusts alignment
  `;
});
