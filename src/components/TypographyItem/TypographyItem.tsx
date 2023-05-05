import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

type TypographyProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  textAlignKey: any;
  fontSizeKey: number;
  fontFamilyKey: string;
  fontStyleKey: string;
};

export const TypographyItem = styled(Typography)((props: TypographyProps) => ({
  color: '#696969',
  alignItems: 'center',
  textAlign: props.textAlignKey,
  verticalAlign: 'middle',
  fontFamily: props.fontFamilyKey,
  fontStyle: props.fontStyleKey,
  fontWeight: 600,
  fontSize: props.fontSizeKey,
}));
