export default function Carrito() {
    return(
        <main>
        <h1>Carrito de Compras</h1>
        <div className="carrito-box">
            <div id="carrito-contenido"></div>
            <div id="carrito-resumen"></div>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
                <a href="pago.html" className="btn-pagar">Ir a pagar</a>
            </div>
        </div>
    </main>
    );
}