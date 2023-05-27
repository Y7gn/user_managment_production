import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "لوحة التحكم",

    path: "/",
    icon: <IoBarChartSharp />,
    menuItems: ["لوحة التحكم"],
  },
  {
    id: 2,
    text: "الموظفين",
    // path: "all-jobs",
    path: ["add-employee", "all-employee"],

    icon: <MdQueryStats />,
    menuItems: [
      "اضافة موظفين جديد",
      // "أدوار الموظفين",
      "جميع الموظفين",
      // "الموظف المثالي",
    ],
  },
  {
    id: 3,
    text: "العملاء",
    // path: "add-job",
    path: ["add-customer", "emp-customers", "all-customers"],
    icon: <FaWpforms />,
    menuItems: [
      "انشاء عميل جديد",
      // "ارسال عميل",
      // "الحسابات المنتظرة",
      "عملائي",
      "جميع العملاء",
    ],
  },
  {
    id: 4,
    text: "التقارير",
    // path: 'profile',
    path: ["profile", "aw", "all-jobs", "add-job"],
    icon: <ImProfile />,
    menuItems: [
      "اضافة موظفين جديد",
      "أدوار الموظفين",
      "جميع الموظفين",
      "الموظف المثالي",
    ],
  },
  // {
  //   id: 4,
  //   text: "reports",
  //   // path: 'profile',
  //   path: ["profile", "/", "all-jobs", "add-job"],
  //   icon: <ImProfile />,
  //   menuItems: ["add", " roles", " all", "best "],
  // },
];

export default links;
