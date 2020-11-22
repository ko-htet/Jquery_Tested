$(document).ready(function(){
    $("#c_table").hide();
    showdata();
    count();
    $(".ct").click(function(){
        $("#products").hide();
        $("#c_table").show();
    })
    $(".home").click(function(){
        $("#c_table").hide();
        $("#products").show();
    })
    $(".atc").click(function(){
        var id = $(this).data('id');
        var name = $(this).data('name');
        var photo = $(this).data('photo');
        var price = $(this).data('price');

        var item = {
            id:id,
            name:name,
            photo:photo,
            price:price,
            qty:1
        }
        
        var itemlist = localStorage.getItem("products");
        var itemArray;
        if(itemlist == null){
            itemArray = [];
        }else{
            itemArray = JSON.parse(itemlist);
        }
        var status = false;
        $.each(itemArray,function(i,v){
            if(v.id == id){
                v.qty++;
                status = true;
            }
        })
        if(!status){
            itemArray.push(item);
        }
        var itemstring = JSON.stringify(itemArray);
        localStorage.setItem("products", itemstring);
        showdata();
        count();
    })
    function showdata(){
        var itemlist = localStorage.getItem("products");
        var itemArray = JSON.parse(itemlist);
        var j = 1;
        var html = "";
        var total = 0;
        $.each(itemArray, function(i,v){
            var subtotal = v.qty * v.price;
            total += subtotal;
            html += `<tr>
                    <th>${j++}</th>
                    <th>${v.name}</th>
                    <th><img src="images/${v.photo}" width="50px" height="70px"></th>
                    <th><button class="btndecrease" data-id="${i}">-</button>${v.qty}<button class="btnincrease" data-id="${i}">+</button></th>
                    <th>${v.price}</th>
                    <th>${subtotal}</th>
                    <th><button data-id="${i}" class="remove">Remove</button></th>
                </tr>`
        })
        html += `<tr><th colspan="5">Total amount:</th><th>${total}</th><th></th></tr>`
        $("tbody").html(html);
    }
    $("tbody").on("click",".remove",function(){
        var id=$(this).data("id");
        var itemlist=localStorage.getItem("products");
        var ItemArray=JSON.parse(itemlist);
        ItemArray.splice(id,1);
        var itemstring=JSON.stringify(ItemArray);
        localStorage.setItem("products", itemstring);
        showdata();
        count();
    })
    function count(){
        var totalcount=0;
        var itemlist=localStorage.getItem("products");
        if(itemlist){
            ItemArray=JSON.parse(itemlist);
            $.each(ItemArray,function(i,v){
                totalcount+=v.qty;
            })
        }
        $(".cart").html(totalcount);
    }
    $("tbody").on("click",".btnincrease",function(){
        var id = $(this).data("id");
        var itemlist = localStorage.getItem("products");
        var itemArray = JSON.parse(itemlist);
        $.each(itemArray,function(i,v){
            if(i == id){
                v.qty++;
            }
        })
        var stringitem = JSON.stringify(itemArray);
        localStorage.setItem("products", stringitem);
        showdata();
        count();
    })
    $("tbody").on("click",".btndecrease",function(){
        var id = $(this).data("id");
        var itemlist = localStorage.getItem("products");
        var itemArray = JSON.parse(itemlist);
        $.each(itemArray,function(i,v){
            if(i == id){
                v.qty--;
                if(v.qty < 1){
                    itemArray.splice(id,1);
                }
            }
        })
        var stringitem = JSON.stringify(itemArray);
        localStorage.setItem("products", stringitem);
        showdata();
        count();
    })
    $("#check_out").click(function(){
        localStorage.clear();
        showdata();
        count();
        $("tbody").html(`<tr><th colspan="7">No Item</th></tr>`);
    })
})