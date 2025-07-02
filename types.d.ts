import { Connection } from "mongoose";


declare global{
    var mongoose : {
        conn: Connection | null;
        promise : Promise<Connection> | null;
    }
}

export {} 

//global variable to aware the ecosystem for the connection of db
