import path from "node:path"

const filePath = path.join(process.cwd(), "./src/dataBase/db.json")

export const readProduct = () =>{
    // console.log(process.cwd())
    console.log(filePath)
}