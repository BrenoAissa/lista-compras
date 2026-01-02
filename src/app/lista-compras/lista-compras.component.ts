import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ItemLista } from './item-lista'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent implements OnInit{
  item: string = "";
  lista: ItemLista[] = [];

    ngOnInit(): void {
    const dados = localStorage.getItem('listaCompras');
    if (dados) {
      this.lista = JSON.parse(dados);
    }
  }

  adicionarItem(){
    let itemLista = new ItemLista();
    
    const existe = this.lista.some(item => item.nome.toLowerCase() === this.item.toLowerCase());

    if(existe){
      alert("Item já adicionado");
      return;
    }
    
    itemLista.nome = this.item;
    itemLista.id = this.lista.length + 1;

    this.lista.push(itemLista);
    this.salvarLista();
    this.item = "";
  }

  riscarItem(itemLista: ItemLista){
    itemLista.comprado = !itemLista.comprado;
    this.salvarLista();
  }

  limparLista(){
    this.lista = [];
    this.salvarLista();
  }

  salvarLista() {
    localStorage.setItem('listaCompras', JSON.stringify(this.lista));
  }
}
