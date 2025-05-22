// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;
  `;
});

// export const StyledDetailsGridContainer = styled.div(() => {
//   return css`
//     margin-line-start: 1;
//   `;
// });

// export const StyledDetailsGridContainer = styled.div(() => {
//   return css`
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 10px;
//   `;
// });

export const StyledDetailsGridContainer = styled.div(() => {
  return css`
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 10px;
  `;
});
export const StyledHighlightedFieldsHrLine = styled.hr(() => {
  return css`
    line: {
      margin: '0.75rem 0';
      opacity: '50%';
    }
  `;
});
