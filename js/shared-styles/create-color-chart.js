import Colors from 'material-ui/lib/styles/colors';

export default function createColorChart (ids) {
  const colorOptions = [
    Colors.red400,
    Colors.cyan400,
    Colors.brown400,
    Colors.indigo400,
    Colors.orange400,
    Colors.grey800,
  ];
  const colorChart = {};

  if (ids.length) {
    ids.map((id, i) => {
      colorChart[id] = colorOptions[i];
    });
  }

  return colorChart;
}

