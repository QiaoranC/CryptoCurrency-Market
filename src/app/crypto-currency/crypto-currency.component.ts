import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgClass } from '@angular/common';
import {Observable} from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.css']
})

export class CryptoCurrencyComponent implements OnInit {
  private fullCCAPI = 'https://api.coinmarketcap.com/v1/ticker/?limit=200';
  private searchAPI = 'https://api.coinmarketcap.com/v1/ticker/?limit=200&convert=';

  CryptoCurrency: Object;
  // CryCurSearch: Object;

  constructor(private http: Http) {
    this.getFullCC();
    this.storeFullCC();
  }

  ngOnInit() {
        $('.table').stupidtable();
    //search bar
    $(document).ready(function() { 
      $(".search").keyup(function () {
        var searchTerm = $(".search").val();
        var listItem = $('.results tbody').children('tr');
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
        
      $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
      });
        
      $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
        $(this).attr('visible','false');
      });

      $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
        $(this).attr('visible','true');
      });

      var jobCount = $('.results tbody tr[visible="true"]').length;
        $('.counter').text(jobCount + ' item');

      if(jobCount == '0') {$('.no-result').show();}
        else {$('.no-result').hide();}
          });
    });

    // ===== Scroll to Top ==== 
      $(window).scroll(function() {
          if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
              $('#return-to-top').fadeIn(200);    // Fade in the arrow
          } else {
              $('#return-to-top').fadeOut(200);   // Else fade out the arrow
          }
      });
      $('#return-to-top').click(function() {      // When arrow is clicked
          $('body,html').animate({
              scrollTop : 0                       // Scroll to top of body
          }, 500);
      });
  }

  ngAfterViewInit(){
    //data sort
  }

  getFullCC(){
    return this.http.get(this.fullCCAPI)
      .map((res: Response) => res.json())
  }

  storeFullCC(){
    this.getFullCC().subscribe(data => {
      console.log(data);
      this.CryptoCurrency = data
    })
  }

  performSearch(searchTerm: HTMLInputElement): void {
    var apiLink = this.searchAPI + searchTerm.value;

    this.http.request(apiLink)
        .subscribe((res: Response) => {
              this.CryptoCurrency = res.json();
              console.log(this.CryptoCurrency);
        });
  }
  
 public selecteditem: Observable<Object>;

 onClick(item:any, lgModal:any){

   this.selecteditem = item;

   console.log(this.selecteditem); 
 }


}
