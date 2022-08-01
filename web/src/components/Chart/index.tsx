import React, { useMemo } from 'react';
import { Chart } from 'react-charts';

interface DataI {
  label: string;
  data: (string | number)[][];
}

interface ChartProps {
  data: DataI[];
  axes: any;
}

const ChartComponent: React.FC<ChartProps> = ({ data, axes }) => {
  const series = useMemo(
    () => ({
      showPoints: true,
    }),
    [],
  );

  const tooltip = useMemo(
    () => ({
      align: 'center',
      tooltipArrowPadding: '3',
      arrowPosition: 'center',
      show: true,
      // padding: '-4',
    }),
    [],
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease',
    }),
    [],
  );

  const getDatumStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease',
    }),
    [],
  );

  return (
    <Chart
      data={data}
      series={series}
      axes={axes}
      getSeriesStyle={getSeriesStyle}
      getDatumStyle={getDatumStyle}
      tooltip={tooltip}
    />
  );
};

export default ChartComponent;
