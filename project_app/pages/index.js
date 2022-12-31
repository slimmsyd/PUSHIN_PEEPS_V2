import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import PeepsOne from '../public/images/Peeps_One.png'
import PeepsTwo from '../public/images/Peeps_Two.png'
import PeepsLogo from '../public/images/Peeps_Logo.png'
import Discord from '../public/images/Discord.png'
import Twitter from '../public/images/Twitter.png';
import Opensea from '../public/images/Opensea.png'
import Instagram from '../public/images/Instagram.png'

import Swiper from 'swiper';
import 'swiper/css'; 

import { ADDRESS,ABI } from '../constants'
import React, {useState, useEffect, useRef} from 'react'; 
import {ethers, providers, Contract, utils} from 'ethers'; 
import Web3modal from 'web3modal';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  

  const [isConnected, setIsConnected] = useState(false); 
  let [accountAddress, setAccountAddress] = useState("");
  const [setLoading, isLoading] = useState(false); 
  const [tokenCost, setTokenCost] = useState("")
  const [tokenAmount, setTokenAmount] = useState(0)

  const web3modal = useRef(); 


  useEffect(() => {
    web3modal.current = new Web3modal(
      {
        network: "mumbai", 
        providerOptions: {},
        disableInjectedProvider: false
      }
    )
  })


//This functino splits the string 
const splitString = string => { 
  let result1 = string.substring(0,5) //gets the first 5 charactesr of string 
  let result2 = string.substring(38, string.lenght) // lets the last 5? dendingon the length of array 
  let finalResult = result1 + "..." + result2 //concact them together 
  return finalResult;

}
let address_account 
  //get provider or Signer 
  const getProviderOrSigner = async(needSigner = false) => { 
    const provider = await web3modal.current.connect()
    const web3provider = new providers.Web3Provider(provider)

    const signer =  web3provider.getSigner();
    const address = await  signer.getAddress();
    const substringAddress = splitString(address);
    address_account = substringAddress
    console.log(substringAddress)
    setAccountAddress(substringAddress);
    //check if connected currenlty to the right chainID
    //set it in brackets because chainID is an object 
    const {chainId} = await web3provider.getNetwork();
    if(chainId !== 137) { 
      // window.alert("You are on the wrong network, switch to rinkeby")
    }

    if(needSigner) { 
      const signer = web3provider.getSigner(); 
      return signer;
    }

    return address_account;
    return web3provider;
  }

  const connect = async() => 
  { 
    try {
      await getProviderOrSigner();
      setIsConnected(true); 
    }catch(e)
     { 
      console.error(e)
     }
  }


  

  //Read balance contract:
  const read_balance = async() => 
  { 
    try{ 
        const provider = await getProviderOrSigner(true); 
        const contract = new Contract(
          ADDRESS,
          ABI,
          provider
        )
          const balance = parseInt((await contract.cost()).toString())
          console.log(balance)
        


    }catch(e)
    { 
      console.error(e)
    }
  } 

  // const price = async()
  const mint = async() => 
  { 
    try{ 
        const provider = await getProviderOrSigner(true); 
        const contract = new Contract(
          ADDRESS,
          ABI,
          provider
        )
        
         
          const tx = await contract.mint(1,{value: utils.parseEther("10"),
          gasLimit: 200000
        },)
          //wait for tx 
          await  tx.wait();
          window.alert("NFT has been minted"); 
          console.log(tx)
    }catch(e)
    { 
      console.error(e)
    }
  } 





const returnAdress = () => 
{ 
  if(isConnected === true)
  {
    return(
      
      <div onClick={connect} className = {styles.linkContainer}>
      <a className = {styles.header_links}>{accountAddress}</a>
    </div>
    )
  }else 
  { 
    return(
      <div onClick={connect} className = {styles.linkContainer}>
      <a className = {styles.header_links}>CONNECT WALLET</a>
    </div>
    )
  }
}




//Swiper Code 

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  // loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
});

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Pushin Peeps</title>
        <meta name="description" content="Pushing The Boundaries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Peeps_Logo.png" />
      </Head>

      <nav className = {styles.nav}>
      <div className = {styles.slider_wrapper}>
        <div className={styles.item_holder}>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>

          
    

                </div>
    
    
    
                
              
          </div>

      </nav>


      <header className={styles.main}>

          <div className = {styles.heroContainer}>
          <div className = {styles.linkContainer}>

                    <a className = {styles.header_links} href = "#">
                      <Image src = {Discord} alt = "Discord" />
                        <span>JOIN US</span>
                      
                      </a>
                  </div>

              <div className = {styles.container}> 

               
                    <div className = {styles.header}>
                        <Image src = {PeepsLogo} alt = "peepslogo" />
                    </div>



              </div>

              {returnAdress()}
              {/* <div onClick={connect} className = {styles.linkContainer}>
                    <a className = {styles.header_links}>CONNECT WALLET</a>
                  </div> */}

            </div>   



      </header>


  
      <div className = {styles.container}>
      <div className = {styles.hero}>
            <h1 className={styles.widthLarge}>Fostering A Web3 Community Of Validation</h1>
            <p className = {styles.sub}>Utilzing growth through decentralized proposals, partnerships and creative utility.</p>
              <label>How many ?</label>

            <div className = {styles.buttonRow}>
              <input className = {styles.input} type = "number" placeholder = "How Many"
              onChange = {(e) => setTokenAmount(e.target.value)}
              />
              <button
                // disabled = {!tokenAmount > 0}
              onClick={() => mint()} className = {styles.mint}>MINT</button>
                <span  className = {styles.center}>10 MATIC</span>

            
            </div>


          </div>

    </div>



    <div className = {`${styles.slider_wrapper} ${styles.margin_top}`}>
    <div className={styles.item_holder}>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>
            <div className={styles.items}>
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = "../images/Peeps_Two.png" />
              <img className = {styles.item} src = "../images/Peeps_One.png" />
              <img className = {styles.item} src = " ../images/Peeps_Two.png" />

            </div>

          
    

                </div>
    
                
              
          </div>


          <div className = {styles.container}>
      <div className = {styles.hero}>
            <h1>Pushing Towards Future Of Web3</h1>

            <div >
              <p>Welcome to PushinPeeps Metaverse, the ultimate online community for fans of the decentralized web!
</p>
            </div>
      


          </div>

    </div>


    <div className = {styles.sideBarWrapper}>
        <div className = {styles.grid_column}>
          <div className = {styles.grid_items}>

              <p className = "bold"></p>
              <p>Are you excited about the potential of Web3 and the Metaverse? Do you want to connect with others who share your passion for decentralization and virtual reality? Look no further, because PushinPeeps is here to help. </p>

  <p>With our community on Discord, you will have access to a wealth of knowledge, support, and resources to help you navigate the exciting world of Web3 and the Metaverse. Whether you are just starting out or you are a seasoned pro, PushinPeeps has something for everyone.</p>

          </div>  
   
          <div className = {styles.grid_items}>

              <p className = "bold">Here is what you can expect from our community</p>
<ul>
              <li>Expert advice and supportive environment where you can connect with ohters who share your passion for Web3 and the Metaverse</li>
              <li>Access to wide range of resources, including Web3 and Metaverse news, tutorials and more</li>
              <li>Opportunities to participate in events, hackathons, and other community activties</li>
              <li> Networking and collaboration opportunities with like-minded individuals</li>
            <p>Join PushinPeeps today and become part of the exciting world of Web3 and the Metaverse</p>
             </ul>


          </div>
   


   
        </div>


    </div>

    <div className = {styles.row}>

      <a className = {`${styles.margin_top} ${styles.mint}`}>MINT</a>

    </div>
    {/* MOBILE SWIPER */}

    <div className = {styles.cardContainerMobile}>

        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
            <div className = {`${styles.cardOne} ${styles.card}`}>
                </div>
            </div>
            <div class="swiper-slide">
            <div className = {`${styles.cardTwo} ${styles.card}`}>

</div>
            </div>
            <div class="swiper-slide">
    <div className = {`${styles.cardThree} ${styles.card}`}>
              
            </div>
            </div>
            ...
          </div>
          <div class="swiper-pagination"></div>

          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

          <div class="swiper-scrollbar"></div>
        </div>
              </div>                


    {/* MOBILE SWIPER */}
    <div className = {styles.cardContainer}>

        <div className = {styles.card_flex}>

            <div className = {`${styles.cardOne} ${styles.card}`}>

            </div>
            <div className = {`${styles.cardTwo} ${styles.card}`}>

            </div>
            <div className = {`${styles.cardThree} ${styles.card}`}>
              
            </div>


        </div>




    </div>


    
    <div className = {styles.container}>
      <div className = {`${styles.hero}`} >
            <h2 className={`${styles.widthLarge} ${styles.margin_top}`}>Web3 Community with tools. Utility Dashboard and Ecoysystem. Digital Collectors Have Been Dreaming Of.</h2>
          </div>


  
          <div className = {styles.sideBarWrapper}>
        <div className = {styles.grid_column}>

   
          <div className = {styles.grid_items}>
              <p>PV2NFT is Official Member Id Token to the PushinPeeps Community</p>
              <li>How long you hold, the quantity, the traits all play a part of your experience within the PushinPeeps community.</li>
              <li>Peeps Utility is Powered by Tropee. This dashboard will run all utility Campaigns. Simply connect your holders wallet and claim.</li>

          </div>

   
        </div>



    </div>


    </div>

    <div className = {styles.row}>

<a href = "https://pushinpv2.tropee.com/" className = {`${styles.margin_top} ${styles.mint}`}>Utilty Dashboard</a>

</div>
    <footer className = {styles.footer}>

      <div className ={styles.footerHeading}>
        <div className = {styles.footerHeadingWrapper}>
          <h3>PUSHIN P</h3>
        </div>
      </div>

      <div className = {styles.flexBox}>
      <span className = {styles.thin}>DOA Labs</span>

        <div className = {styles.footerFlexRow}>
          <Image  className = {styles.footerImages} src = {Twitter} alt = "twitter" />
          <Image   className = {styles.footerImages}  src = {Opensea} alt = "twitter" />
          <Image    className = {styles.footerImages} src = {Instagram} alt = "twitter" />
      
        </div>
      </div>

    </footer>

   

    </div>
  )
}
