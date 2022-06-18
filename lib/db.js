import 'dotenv/config'

import mysql from 'mysql'

const { DB_URL } = process.env
var pool = mysql.createPool(DB_URL);

/**
 * 
 * @param {string} sql - mysql语句
 * @param {Array} data - 填充mysql占位符的参数队列
 */

const query = (sql,data)=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection( (err, conn) =>{
            if (err) {
                return reject(err);
            } else {
                conn.query(sql,data, (qerr, data, fields)=> {
                    if(qerr){
                        return reject(err);
                    }

                    resolve(data);
                    conn.release();
                    
                });
            }
        });
    }).catch((err)=>{ console.log(err+"1");})
}

export default query 