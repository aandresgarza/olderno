
//let resData = await fetch('/./data/photo.json')
import { VAR_DATA } from "../environments.js";

//GET All data
export async function getRequestData(item = 0) {
    let resFiltred = [];
    let resData = await fetch(VAR_DATA)
        .then(res => res.json())
        .then(async (result) => { return result },
            (error) => { return error });
    if (item !== 0) {
        resData.forEach(element => {
            if (element.id == item) {
                resFiltred.push(element)
            }
        });
        if (resFiltred.length === 0) {
            resFiltred = "Artículo no encontrado";
        }
    } else {
        resFiltred = resData;
    }
    return resFiltred;
}
export default { getRequestData }