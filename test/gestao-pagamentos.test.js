import assert from 'assert';
import ServicoDePagamento from '../src/servicoDePagamento.js';

describe('Gestão de Pagamentos', function () {
    it('Realizar pagamento caro', function () {
        // Arrange
        const pagamento = { codigoBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 150 };
        const valorEsperado = { codigoBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 150, categoria: 'cara' };
        const servicoDePagamento = new ServicoDePagamento();
        // Act
        const pagar = servicoDePagamento.pagar(pagamento.codigoBarras, pagamento.empresa, pagamento.valor);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        // Assert
        assert.deepEqual(ultimoPagamento, valorEsperado);
    });

    it('Realizar pagamento padrão de 100 reais', function () {
        // Arrange
        const pagamento = { codigoBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 100 };
        const valorEsperado = { codigoBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 100, categoria: 'padrão' };
        const servicoDePagamento = new ServicoDePagamento();
        // Act
        const pagar = servicoDePagamento.pagar(pagamento.codigoBarras, pagamento.empresa, pagamento.valor);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        // Assert
        assert.deepEqual(ultimoPagamento, valorEsperado);
    });

    it('Realizar pagamento padrão', function () {
        // Arrange
        const pagamento = { codigoBarras: '2026-2131-3121', empresa: 'Empresa A', valor: 13.8 };
        const valorEsperado = { codigoBarras: '2026-2131-3121', empresa: 'Empresa A', valor: 13.8, categoria: 'padrão' };
        const servicoDePagamento = new ServicoDePagamento();
        // Act
        const pagar = servicoDePagamento.pagar(pagamento.codigoBarras, pagamento.empresa, pagamento.valor);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        // Assert
        assert.deepEqual(ultimoPagamento, valorEsperado);
    });

    it('Realizar pagamento vazio', function () {
        // Arrange
        const pagamento = { codigoBarras: '', empresa: '', valor: 0 };
        const servicoDePagamento = new ServicoDePagamento();
        // Act & Assert
        assert.throws(() => {
            servicoDePagamento.pagar(pagamento.codigoBarras, pagamento.empresa, pagamento.valor), Error, "Código de barras, empresa e valor são obrigatórios para realizar um pagamento."
        });
    });

    it('Realizar pagamento zerado', function () {
        // Arrange
        const pagamento = { codigoBarras: '2026-2131-3121', empresa: 'Empresa A', valor: 0 };
        const servicoDePagamento = new ServicoDePagamento();
        // Act & Assert
        assert.throws(() => {
            servicoDePagamento.pagar(pagamento.codigoBarras, pagamento.empresa, pagamento.valor), Error, "O pagamento deve conter um valor maior que zero."
        });
    });
});