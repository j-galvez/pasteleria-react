export default function Pago(){
    return(

        <main>
        <h1>Finalizar compra</h1>
        <div className="carrito-box">
            <form id="form-pago">
                <h2>Datos del cliente</h2>
                <label>Nombre completo:<br/>
                    <input type="text" name="nombre" required/>
                </label>
                <label>Email:<br/>
                    <input type="email" name="email" required/>
                </label>
                <label>Dirección:<br/>
                    <input type="text" name="direccion" required/>
                </label>
                <label>Teléfono:<br/>
                    <input type="tel" name="telefono" required/>
                </label>

                <h2>Método de pago</h2>
                <label>
                    <input type="radio" name="metodo" value="tarjeta" required/> Tarjeta de crédito/débito
                </label>
                <label>
                    <input type="radio" name="metodo" value="efectivo" required/> Pago en efectivo
                </label>
                <button type="submit" class="btn-pagar" style={{marginTtop:'20px'}}>Confirmar pedido</button>
            </form>
            <div id="resumen-pedido" style={{marginTtop:'30px'}}></div>
        </div>
    </main>

    );
}