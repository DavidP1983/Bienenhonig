"use client"

import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { NavigationType } from "@/shared/types/type";
import { MenuNavBar } from "./MenuNavBar";
import { navigation } from "./Navbar";
import Link from "next/link";
import Image from 'next/image';

import logo from "@/assets/img/logo.png";

import styles from '@/styles/NavBarMobile.module.scss'


export default function Variants() {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { height } = useDimensions(containerRef)

    return (
        <div>
            <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    className={styles.nav}
                    onAnimationStart={() => {
                        if (isOpen) {
                            containerRef.current?.style.setProperty("pointer-events", "auto");
                        }
                    }}
                    onAnimationComplete={() => {
                        if (!isOpen) {
                            containerRef.current?.style.setProperty("pointer-events", "none");
                        }
                    }}
                >
                    <motion.div className={styles.background} variants={sidebarVariants} />
                    <Navigation toggle={() => setIsOpen(!isOpen)} />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
            </div>
        </div>
    )
}

const navVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
}

const Navigation = ({ toggle }: { toggle: () => void }) => (
    <motion.ul className={styles.list} variants={navVariants}>
        {navigation.map((item) => (
            <MenuItem item={item} key={item.id} toggle={toggle} />
        ))}
        <motion.li
            className={styles.listItem}
            variants={itemVariants}
            onClick={toggle}
        >
            <Link href='/'>
                <Image
                    src={logo}
                    alt='logo'
                    width={100}
                    height={100}
                    priority={true} />
            </Link>
        </motion.li>
    </motion.ul>
)

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        cursor: "pointer",
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        cursor: 'auto',
        transition: {
            y: { stiffness: 1000 },
        },
    },
}


const MenuItem = ({ item, toggle }: { item: NavigationType, toggle: () => void }) => {
    return (
        <motion.li
            onClick={toggle}
            className={styles.listItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <MenuNavBar {...item} />
        </motion.li>
    )
}

const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}

interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
)

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button className={styles.toggleContainer} onClick={toggle} title="hamburger" aria-label="hamburger">
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
)



/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth
            dimensions.current.height = ref.current.offsetHeight
        }
    }, [ref])

    return dimensions.current
}