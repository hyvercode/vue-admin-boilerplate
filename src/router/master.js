import Pages from "../helpers/Master";
import Users from "../views/Users";
import UserIndex from "../components/users/UserIndex";
import MenuList from "../views/MenuList";
import MenuListIndex from "../components/menuList/MenuListIndex";
import Menu from "../views/Menu";
import MenuIndex from "../components/menu/MenuIndex";
import MenuGroup from "../components/menuGroup/MenuGroupIndex";
import Banner from "../views/Banner";
import Profile from "../views/Profile";
import Education from "../views/Education";
import Notifications from "../views/Notification";
import Role from "../views/Role";

export default [
    {
        path: Pages.PROFILE,
        name: "profile",
        component: Profile,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/profile/Index.vue"),
            },
        ],
    },
    {
        path: Pages.NOTIFICATIONS,
        name: "Notifications",
        component: Notifications,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/notifications/Index.vue"),
            },
            {
                path: Pages.NOTIFICATION_READ,
                name: "NotificationRead",
                component: () => import("../components/notifications/Read.vue"),
            },
        ],
    },
    {
        path: Pages.USERS,
        name: 'Users',
        component: Users,
        children: [
            {
                path: "",
                name: "Index",
                component: UserIndex
            }
        ]
    },
    {
        path: Pages.MENU_LIST,
        name: 'Menu',
        component: MenuList,
        children: [
            {
                path: "",
                name: "Index",
                component: MenuListIndex
            }
        ]
    },
    {
        path: Pages.MENU,
        name: 'Menu',
        component: Menu,
        children: [
            {
                path: "",
                name: "Index",
                component: MenuIndex
            }
        ]
    },
    {
        path: Pages.MENU_GROUP,
        name: 'Menu',
        component: MenuList,
        children: [
            {
                path: "",
                name: "Index",
                component: MenuGroup
            }
        ]
    },
    {
        path: Pages.ROLES,
        name: "Role",
        component: Role,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/role/RoleIndex.vue"),
            },
        ],
    },
    {
        path: Pages.BANNER,
        name: "Banner",
        component: Banner,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/banner/Index.vue"),
            },
        ],
    },
    {
        path: Pages.EDUCATIONS,
        name: "Educations",
        component: Education,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/backoffice/education/EducationIndex"),
            },
        ],
    },
]
