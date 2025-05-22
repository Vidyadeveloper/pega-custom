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

import StyledPegaConstellationUiGalleryL1DrWrapper, {
  StyledDetailsGridContainer,
  StyledHighlightedFieldsHrLine
} from './styles';

// includes in bundle
import { getAllFields } from './utils';

// interface for props
interface PegaConstellationUiGalleryL1DrProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  showLabel: boolean;
  showHighlightedData: boolean;
  children: ReactElement[];
}

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaConstellationUiGalleryL1Dr(props: PegaConstellationUiGalleryL1DrProps) {
  const { getPConnect, label, children, showLabel = true, showHighlightedData = false } = props;
  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };

  // update children with readonly
  Children.toArray(children).forEach((child: any) => {
    child.props.getPConnect().setInheritedProp('readOnly', true);
    child.props.getPConnect().setInheritedProp('displayMode', 'DISPLAY_ONLY');
  });

  console.log('Raw Metadata:', getPConnect().getRawMetadata());
  const numRegions = getAllFields(getPConnect)?.length;
  console.log('numRegions', numRegions);

  // const gridRepeat = "repeat(".concat(numRegions).concat(", 1fr)");
  const gridRepeat = `repeat(${Math.min(numRegions, 4)}, 1fr)`;
  console.log('gridRepeat', gridRepeat);
  const gridContainer: GridContainerProps = { colGap: 6 };
  gridContainer.cols = gridRepeat;
  gridContainer.alignItems = 'start';

  // Set up highlighted data to pass in return if is set to show, need raw metadata to pass to createComponent
  let highlightedDataArr = [];
  if (showHighlightedData) {
    // @ts-ignore
    const { highlightedData = [] } = getPConnect().getRawMetadata().config;
    highlightedDataArr = highlightedData.map((field: any) => {
      return <HighlightRender field={field} getPConnect={props.getPConnect} />;
    });
  }

  return (
    <StyledPegaConstellationUiGalleryL1DrWrapper>
      <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
        {showHighlightedData && highlightedDataArr.length > 0 && (
          <>
            <Flex
              container={{ direction: 'row', alignItems: 'start', colGap: 10 }}
              data-testid={`highlighted-column-count-${numRegions}`}
            >
              {highlightedDataArr.map((child: any, i: number) => (
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
          {children.map((child: any, i: number) => (
            <Flex
              // @ts-ignore
              container={{ direction: 'column', alignItems: 'normal', colGap: 1, rowGap: 1.5 }}
              key={`r-${i + 1}`}
            >
              <DetailsRender child={child} />
            </Flex>
          ))}
        </Grid>
      </FieldGroup>
    </StyledPegaConstellationUiGalleryL1DrWrapper>
  );
}

export default withConfiguration(PegaConstellationUiGalleryL1Dr);
