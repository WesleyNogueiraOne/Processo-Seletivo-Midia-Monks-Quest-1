//Leitura de arquivos JSON
const fs = require ("fs");

function lerArquivos(){

  const data1 =fs.readFileSync ("broken_database_1.json", "utf-8");
  const data2 =fs.readFileSync ("broken_database_2.json", "utf-8");
  const banco1 = JSON.parse(data1);
  const banco2 = JSON.parse(data2);

  return { banco1, banco2 };

};
//Corrigir nomes de marca e veículo;
function corrigirNomes(Banco){

         for (const registro of Banco){
        if (registro && registro.marca) {

            registro.marca = registro.marca.replace(/æ/g, "a").replace(/ø/g, "o");

        }
    
        if (registro && registro.nome) {

         registro.nome = registro.nome.replace(/æ/g, "a").replace(/ø/g, "o");

        }
    }
 }

 //Corrigir vendas
 function corrigirVendas(banco){
       for(const registro of banco){
        registro.vendas = Number(registro.vendas);
    }   
 }

 //Exportar um arquivo JSON com o banco corrigido
 function exportarArquivos(banco, nomeArquivo){
    const jsonBanco = JSON.stringify(banco, null, 2);
    fs.writeFileSync(nomeArquivo, jsonBanco, "utf-8");

 }

 const {banco1, banco2} = lerArquivos();

 if (banco1 && banco2){
    corrigirNomes(banco1)
    corrigirVendas(banco1)
    exportarArquivos(banco1, "banco_corrigido_1.json");

    corrigirNomes(banco2)
    exportarArquivos(banco2, "banco_corrigido_2.json");
 }