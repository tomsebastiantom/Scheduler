import type { FC } from 'react';
import { useTheme } from '@mui/material/styles';

export const Logo: FC = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
    
      xmlns="http://www.w3.org/2000/svg"
    >
     <g><path  d="M 533.5,157.5 C 537.182,157.335 540.848,157.501 544.5,158C 666.03,283.196 787.197,408.696 908,534.5C 910,537.833 910,541.167 908,544.5C 786.167,670.333 664.333,796.167 542.5,922C 540.167,922.667 537.833,922.667 535.5,922C 413.636,796.47 292.136,670.637 171,544.5C 170.333,540.833 170.333,537.167 171,533.5C 292.401,408.602 413.234,283.268 533.5,157.5 Z M 538.5,174.5 C 656.3,295.801 773.966,417.301 891.5,539C 774.364,661.137 656.864,782.97 539,904.5C 421.864,782.363 304.364,660.53 186.5,539C 304.037,417.631 421.37,296.131 538.5,174.5 Z M 538.5,195.5 C 649.482,309.816 760.148,424.482 870.5,539.5C 760,653.833 649.5,768.167 539,882.5C 428.5,768 318,653.5 207.5,539C 318.037,424.631 428.37,310.131 538.5,195.5 Z"/></g>
<g><path  d="M 536.5,185.5 C 538.199,185.34 539.866,185.506 541.5,186C 651.303,300.137 761.47,413.971 872,527.5C 875.389,531.382 878.556,535.382 881.5,539.5C 881.281,540.938 880.781,542.271 880,543.5C 766.803,659.696 653.97,776.196 541.5,893C 539.833,893.667 538.167,893.667 536.5,893C 423.667,776.167 310.833,659.333 198,542.5C 197.333,540.5 197.333,538.5 198,536.5C 311.037,419.631 423.87,302.631 536.5,185.5 Z M 538.5,195.5 C 428.37,310.131 318.037,424.631 207.5,539C 318,653.5 428.5,768 539,882.5C 649.5,768.167 760,653.833 870.5,539.5C 760.148,424.482 649.482,309.816 538.5,195.5 Z"/></g>
<g><path  d="M 416.5,402.5 C 453.168,402.333 489.835,402.5 526.5,403C 560.446,467.056 594.279,531.223 628,595.5C 628.5,534.501 628.667,473.501 628.5,412.5C 621.492,412.666 614.492,412.5 607.5,412C 606.39,409.263 606.223,406.429 607,403.5C 616.258,402.84 625.592,402.506 635,402.5C 644.408,402.506 653.742,402.84 663,403.5C 663.728,406.23 663.562,408.897 662.5,411.5C 655.532,412.497 648.532,412.83 641.5,412.5C 641.667,501.501 641.5,590.501 641,679.5C 622.24,680.659 603.407,680.825 584.5,680C 539.618,597.072 495.118,513.905 451,430.5C 450.5,510.499 450.333,590.499 450.5,670.5C 457.5,670.5 464.5,670.5 471.5,670.5C 472.573,673.721 472.573,676.888 471.5,680C 452.926,680.825 434.426,680.659 416,679.5C 415.223,676.571 415.39,673.737 416.5,671C 423.492,670.5 430.492,670.334 437.5,670.5C 437.5,584.5 437.5,498.5 437.5,412.5C 430.492,412.666 423.492,412.5 416.5,412C 415.208,408.835 415.208,405.668 416.5,402.5 Z"/></g>
    </svg>
  );
};