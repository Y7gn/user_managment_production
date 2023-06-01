import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
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
      <BarChart data={data} margin={{ top: 50 }}>
        <div>BarChart</div>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" tickFormatter={formatArabicDate} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
