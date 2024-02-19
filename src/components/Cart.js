import  { useEffect, useState } from 'react'
import { Badge, Card, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {toast} from "react-toastify"
import alanBtn from '@alan-ai/alan-sdk-web';


const Cart = () => {
    const { Meta } = Card;
    const [mainCart,setMainCart] = useState([])
    const [cart,setCart]= useState([])
    const [btn , setBtn]= useState(false)
    useEffect(() => {
        alanBtn({
            key: '16d4cb1403cf604e47fc368f12ee99b72e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                console.log(commandData);

            if (commandData.command == "getMenu") {
                setMainCart(commandData.data)
            } else if (commandData.command == "showCart" ){
                addCartHandler(commandData.data)
              }else if (commandData.command == "opanCart" ){
                setBtn(commandData.data)
              }else if (commandData.command == "closeCart" ){
                setBtn(commandData.data)
              }
            }
        });
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setMainCart(json))
      }, []);
    const addCartHandler =(item)=>{
        setCart(prev=>{
            return[...prev,item]
        });
        toast.success("Product added succsesful!")
    }
    console.log(btn);
  return (
    <div className='flex flex-wrap justify-center gap-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 '>
          {
            mainCart.map((item,index)=>(
                <Card
                hoverable                
                style={{
                  width: 350,
                }}
                className='p-3 shadow-sm'
                key={index}
                cover={<img alt="example" src={item?.image} className='sm:w-[300px] sm:h-[350px]' />}
              >
                <Meta title={item?.title} description={item?.description.slice(0,30)}  />
                
                <div className='bg-light p-2 flex justify-content-between   rounded-lg mt-2'>
                    <div>
                        {item?.category}
                    </div>
                    <div>
                      $ {item?.price}
                    </div>
                </div>
                    <button onClick={
                        ()=>addCartHandler(item)
                    } className='btn btn-outline-primary w-full mt-2'>add cart</button>
                
              </Card>
            ))
         }
         <div className='fixed-top m-3'>
        <button onClick={()=>setBtn(true)}>
        <Space size="large" >
            <Badge count={cart.length ? cart.length : ' 0 '} >
                <ShoppingCartOutlined style={{fontSize:'30px'}} />
            </Badge>
        </Space>
        </button>
            {
                btn && (
                    <div className="modal  " style={{display:"block"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cart</h5>    
                        </div>
                        <div className="modal-body" >
                            {
                                cart.map((item,index)=>(
                                    <div key={index} className='flex    shadow-sm rounded-2 mt-2'>
                                             <div>
                                              <img src={item?.image} alt='a' className='sm:w-[150px] sm:h-[150px] p-2'/>
                                            </div>
                                            <div className='mx-2 p-3'>
                                            <Meta title={item?.title} description={item?.description.slice(0,30)}  />
                                            <div className='bg-light p-2 flex justify-content-between   rounded-lg mt-2'>
                                            <div>
                                                {item?.category}
                                            </div>
                                            <div>
                                            $ {item?.price}
                                            </div>
                                        </div>
                                            </div>
                                            
                                    </div>
                                ))
                            }
                        </div>
                        <div className='modal-footer'>
                        <button onClick={()=>setBtn(false)} type="button" className='btn btn-outline-danger'>close</button>
                        </div>
                    </div>
                    </div>
                    </div>
                )
            }
         </div>
    </div>
  )
}

export default Cart