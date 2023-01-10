const express=require('express');
const app=express();
const port=6004
const mysql =require('./connection').con
app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname + "/public"))
app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/add",(req,res)=>{
    res.render("add")

});
app.get("/search",(req,res)=>
{
    res.render("add")
});
app.get("/search",(req,res)=>
{
    res.render("search")
});
app.get("/update",(req,res)=>
{
       res.render("update")
});
app.get("/delete",(req,res)=>{
    res.render("delete")
});
app.get("/view",(req,res)=>{
    let qry ="select * from user";
    mysql.query(qry,(err,results)=>{
        if(err) throw err
        else{
            res.render("view",{data:results});
        }
    });
});
app.get("/adduser",(req,res)=>{
    const{id,name,email,cake,phone}=req.query
    let qry="select * from user where email=? or phone=?";
    mysql.query(qry,[email,phone],(err,results)=>{
        if(err)
         throw err
          else{
            if(results.length>0){
                res.render("add",{checkmesg:true})

           }
           else{
            let qry2="insert into user values(?,?,?,?,?)";
            mysql.query(qry2,[id,name,email,cake,phone],(err,results)=>{
                if (results.affectedRows > 0){
                    res.render("add",{mesg:true})
                }
            })
           }
        }
    })
});

app.get("/searchuser",(req,res) =>{
    const{id} =req.query;
    let qry="select * from user where id=?";
    mysql.query(qry,[id],(err,results) =>{
        if(err) throw err
        else{
            if (results.length > 0){
                res.render("search",{mesg1:true,mesg2:false})

            }
            else{
                res.render("search",{mesg1:false,mesg2:true})
            }
        }
    });
})
app.get("/updatesearch",(req,res)=>{
    const {id}=req.query;
    let qry="select * from user where id=?";
    mysql.query(qry,[id],(err,results)=>{
        if(err) throw err
        else{
         if(results.length > 0) {
            res.render("update",{mesg1:true,mesg2:false, data: results})
         }else{
            res.render("update",{mesg1: false,mesg2:true,data:results})
         }
        }
    });
})
app.get("/updateuser",(req,res)=>{
    const{id,name,cake} =req.query;
    let qry="update user set  name=? ,cake=? where id=?";
    mysql.query(qry,[name,cake,id],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("update",{umesg:true})
            }
        }
    })
});
app.get("/removeuser",(req,res)=> {
    const{id}=req.query;
    let qry="delete from user where id=?";
    mysql.query(qry,[id],(err,results)=>{
        if (err) throw err
        else{
            if(results.affectedRows > 0){
                res.render("delete",{mesg1:true,mesg2:false})
            }else{
                res.render("delete",{mesg1:false,mesg2:true})
            }
        }
    });
})
app.listen(port,(err) =>{
    if(err)
     throw errelse
     console.log("server is listening at port %d:",port);
});

