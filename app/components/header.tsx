import StatCard from "./HeaderStatCard";

interface Header {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
}

export default function Header({ total, inStock, lowStock, outOfStock }: Header) {

    return (
        <>
            <StatCard total={total} inStock={inStock} lowStock={lowStock} outOfStock={outOfStock} />
        </>
    )
}