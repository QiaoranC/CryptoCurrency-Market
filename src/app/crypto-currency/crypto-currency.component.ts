import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.css']
})


export class CryptoCurrencyComponent implements OnInit {
  private baseAPI   = 'https://api.coinmarketcap.com/v1/';

  CryptoCurrency: {
    [0]:{
      price_aud: number;
      last_updated: number;
    }
  };
  showdetails:  {
    name: string;
    rank: number;
    price_usd: number;
    price_btc: number;
    market_cap_usd: number;
    available_supply: number;
    total_supply: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
  };
  p:number;
  globaldata: {
    total_market_cap_usd: number;
    total_24h_volume_usd: number;
    bitcoin_percentage_of_market_cap: number;
    active_currencies: number;
    active_assets: number;
    active_markets: number;
  };
  // CryCurSearch: Object;

  constructor(private http: Http) {
    this.getFullCC();
    this.getGlobaldata();
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
        if ($(this).scrollTop() >= 10) {        // If page is scrolled more than 50px
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
    var apiLink = this.baseAPI + 'ticker/';

    this.http.get(apiLink)
      .subscribe((res: Response) => {
        this.CryptoCurrency = res.json();
        // console.log(this.globaldata);
      });
  }


  getGlobaldata(){
    var apiLink = this.baseAPI + 'global/';

    this.http.get(apiLink)
      .subscribe((res: Response) => {
        this.globaldata = res.json();
        console.log(this.globaldata);
      });
  }

  performSearch(searchTerm: HTMLInputElement): void {
    var apiLink = this.baseAPI + '/ticker/convert=' + searchTerm.value; //?limit=200&

    this.http.request(apiLink)
      .subscribe((res: Response) => {
        this.CryptoCurrency = res.json();
        console.log(this.CryptoCurrency);
      });
  }

  showDetails (item:any, lgModal:any) {
    this.showdetails = item;
    console.log(this.showdetails); 
   }
}
