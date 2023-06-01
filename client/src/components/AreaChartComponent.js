import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  const formatArabicDate = (date) => {
    // Customize the date formatting logic here
    // This is just a basic example, you may need to modify it according to your specific requirements
    const arabicMonths = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    // const arabicDay = [
    //   "الأحد",
    //   "الاثنين",
    //   "الثلاثاء",
    //   "الأربعاء",
    //   "الخميس",
    //   "الجمعة",
    //   "السبت",
    // ];

    const dateObj = new Date(date);
    // const day = dateObj.getDay();
    // const dayName = arabicDay[day];
    const month = dateObj.getMonth();
    const monthName = arabicMonths[month];
    const year = dateObj.getFullYear();
    // ${dayName}،${dateObj.getDate()}
    return `${monthName} ${year}`;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatArabicDate} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
