sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";

        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
               let produto = {};
               let productModel = new JSONModel(produto);
               let view = this.getView();
               view.setModel(productModel, "ModeloProduto");
            },

            onClickImage: function(OEvent){
                urlObject.redirect(OEvent.getSource().getSrc(), true );

            },

            onPressBuscar: function(){
                var input;
                input = this.byId("inpBusca");
                var valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url: "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method: "GET",
                    async: true,
                    crossDomain: true
                };

                $.ajax(parameters).done(function(response){
                    
                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();

                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();

                }.bind(this) )
                .fail(function(){

                });



                //variavel tipo texto - com aspas
                let material = "Água Mineral Natural";
                //variavel tipo numérico - sem aspas
                let peso = 500;
                //variavel tipo decimal
                let qtdsodio = 15.66;
                //variavel booleano
                let conteudoliquido = true;

                //tabela interna - array
                let composicao = ["bicarbonato", "magnesio", "sulfato", "brometo"];
                //estrutura/objeto - tipo com varias propriedades
                let produto = {
                    descricao: "chá verde",
                    marca: "quaker",
                    peso: 130,
                    uom: "g"
                }
            }
        });
    });
