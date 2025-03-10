import { Link } from '@tanstack/react-router'
import Logo from '../../assets/home/logo.svg'
import { navBarLinks } from '../../data/shared'
import { Button } from '@nextui-org/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconoirProvider, Menu, Xmark } from 'iconoir-react'

function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 30;
            setIsScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <nav style={isScrolled ? {
            backgroundColor: 'rgba(80, 80, 80, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'background-color 0.5s',
        } : {
            transition: 'background-color border-radius 0.5s',
        }} className='backdrop-blur-sm flex justify-between gap-4 items-center p-4 sticky top-0 z-50'>
            <AnimatePresence mode='sync'>
                {menuOpen && <NavMenu setOpen={setMenuOpen} />}
            </AnimatePresence>
            <Link to='/' className='font-questrial flex gap-1 items-center'>
                <img src={Logo} alt="Sustain Score Logo" />
                <span className='font-bold text-4xl hidden md:block'>SustainScore</span>
            </Link>
            <section>
                <ul className='hidden gap-4 md:flex'>
                    {navBarLinks.map((link) => (
                        <Link key={link.url} className='hover:underline flex gap-1 items-center' to={link.url}>
                            {link?.decoration && link.decoration}
                            {link.title}
                        </Link>
                    ))}
                </ul>
                <Button onPress={() => {
                    setMenuOpen(!menuOpen)
                }} className='md:hidden p-0 size-full z-0 bg-transparent w-[40px] min-w-0'>
                    <Menu />
                </Button>
            </section>
        </nav>
    )
}

export default NavBar

type NavMenuProps = {
    setOpen: Dispatch<SetStateAction<boolean>>
}

function NavMenu({ setOpen }: NavMenuProps) {
    const animation = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
    };
    return (
        <motion.div className='size-full fixed top-0 left-0 grid bg-[#000000bf] backdrop-blur-sm z-40' onClick={() => setOpen(false)}>
            <motion.div transition={{
                x: { type: 'spring', bounce: 0, duration: 0.25 },
            }} variants={animation}
                initial="hidden"
                animate="visible"
                exit="exit" onClick={(e) => e.stopPropagation()} className='px-4 py-8 bg-night h-full w-[50%] justify-self-end z-50 relative flex flex-col gap-4'>
                <Link onClick={() => setOpen(false)} to='/' className='font-questrial flex gap-1 items-center justify-center'>
                    <img className='size-[40px]' src={Logo} alt="Sustain Score Logo" />
                    <span className='font-bold text-lg'>SustainScore</span>
                </Link>
                <div className='w-full bg-white h-[1px]'></div>
                <ul className='gap-4 flex flex-col items-center'>
                    {navBarLinks.map((link) => (
                        <Link onClick={() => setOpen(false)} key={link.url} className='hover:underline flex gap-1 items-center' to={link.url}>
                            {link?.decoration && link.decoration}
                            {link.title}
                        </Link>
                    ))}
                </ul>
                <Button onPress={() => setOpen(false)} className='justify-self-end'>
                    <IconoirProvider>
                        <Xmark />
                    </IconoirProvider>
                </Button>
            </motion.div>
        </motion.div>
    )
}


