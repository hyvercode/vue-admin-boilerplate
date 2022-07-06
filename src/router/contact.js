import Pages from "@/helpers/Contact";
import Contact from "@/views/Contact";

export default [
    {
        path: Pages.CONTACT,
        name: "Contact",
        component: Contact,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/contact/Index.vue")
            }
        ],
    }
]
