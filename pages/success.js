import { useEffect } from "react"
import Link from "next/link"
import { BsBagCheckFill } from "react-icons/bs"

import { runFireWorks } from "../lib/utils"
import { useStateContext } from "../context/StateContext"

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

    useEffect(() => {
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireWorks()
    }, [])

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Ďakujeme Vám za objednávku.</h2>
                <p className="email-msg">Ozveme sa Vám čo najskôr.</p>
                <p className="description">Ak máte nejaké otaźky, kontaktuje nás mailom:
                    <a href="mailto::olinoke111@gmail.com" className="email" >olinoke111@gmail.com</a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Pokračovať
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success