import { Fragment, Children, type ReactElement } from 'react';
import {
  Grid,
  Flex,
  FieldGroup,
  withConfiguration,
  type GridContainerProps
} from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import DetailsRender from './DetailsRender';
import HighlightRender from './HighlightRender';
import StyledPegaConstellationUiGalleryLtdrWrapper, { StyledDetailsGridContainer } from './styles';

// includes in bundle
import { getAllFields } from './utils';
import { StyledHighlightedFieldsHrLine } from '../Pega_ConstellationUIGallery_L1DR/styles';

// interface for props
interface PegaConstellationUiGalleryLtdrProps extends PConnFieldProps {
  showLabel: boolean;
  showHighlightedData: boolean;
  children: ReactElement[];
}

// props passed in combination of props from property panel (config.json) and runtime props from Constellation
// any default values in config.props should be set in defaultProps at bottom of this file
function PegaConstellationUiGalleryLtdr(props: PegaConstellationUiGalleryLtdrProps) {
  const { getPConnect, label, children, showLabel = true, showHighlightedData = false } = props;

  // ✅ **Fix: Ensure `getPConnect` is a function before using it**
  if (!getPConnect || typeof getPConnect !== 'function') {
    return null; // **Prevent crash if `getPConnect` is undefined**
  }

  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };

  // Convert children to array and apply readonly mode
  const childArray = Children.toArray(children) as ReactElement[];
  childArray.forEach(child => {
    child.props.getPConnect().setInheritedProp('readOnly', true);
    child.props.getPConnect().setInheritedProp('displayMode', 'DISPLAY_ONLY');
  });

  // ✅ **Fix: Ensure `getPConnect` is correctly passed**
  const numRegions = getAllFields(getPConnect)?.length || 4; // **Ensure at least 3 columns**
  const gridRepeat = `repeat(${numRegions}, 1fr)`;
  const gridContainer: GridContainerProps = { colGap: 8, cols: gridRepeat, alignItems: 'stretch' };

  // Set up highlighted data
  let highlightedDataArr: ReactElement[] = [];
  if (showHighlightedData) {
    const metadata = getPConnect()?.getRawMetadata()?.config || {};
    const highlightedData = (metadata as any).highlightedData ?? [];
    highlightedDataArr = highlightedData.map((field: any) => (
      <HighlightRender field={field} getPConnect={getPConnect} />
    ));
  }

  return (
    <StyledPegaConstellationUiGalleryLtdrWrapper>
      <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
        {showHighlightedData && highlightedDataArr.length > 0 && (
          <>
            <Flex
              container={{ direction: 'row', alignItems: 'start', colGap: 10 }}
              data-testid={`highlighted-column-count-${numRegions}`}
            >
              {highlightedDataArr.map((child, i) => (
                <Fragment key={`hf-${i + 1}`}>{child}</Fragment>
              ))}
            </Flex>
            <StyledHighlightedFieldsHrLine />
          </>
        )}
        <Grid
          as={StyledDetailsGridContainer}
          container={gridContainer}
          data-testid={`column-count-${numRegions}`}
        >
          {childArray.map((child, i) => (
            <Flex
              container={{ direction: 'column', alignItems: 'start', colGap: 1, rowGap: 1.5 }}
              key={`r-${i + 1}`}
            >
              <DetailsRender child={child} />
            </Flex>
          ))}
        </Grid>
      </FieldGroup>
    </StyledPegaConstellationUiGalleryLtdrWrapper>
  );
}

export default withConfiguration(PegaConstellationUiGalleryLtdr);
