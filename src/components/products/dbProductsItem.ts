export interface IBtnView {
    title: string;
    clazz: string;
    order: number;
    content: string;
}
export const btnArray: IBtnView[] = [
    { title: "vertical", clazz: "viewBtn", content: "view_module", order: 2 },
    { title: "horizontal", clazz: "viewBtn", content: "view_list", order: 3 },
    { title: "filter", clazz: "viewBtn mobile", content: "filter_list", order: 5 },

];
