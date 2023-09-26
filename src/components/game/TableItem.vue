<template>
  <div class="container table-container">
    <div class="table-player">
      <div class="table-cards">
        <div 
          class="card-container"
          :class="`c-${i}`"
          v-for="i in 16"
          v-bind:key="i"
        >
          <div 
            class="card-item"
            :class="{ '-played': i === 4 }"
          ></div>
        </div>
        <div 
          class="table-item"
        >
          <div>
            table
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
  @import '../../assets/variables'; 

  .table-container {
    height: calc(100dvh - var(--header-height));
  }

  .table-player {
    background-color: red;

    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100dvw;
    height: 110dvw;
    max-width: 550px;
    margin-bottom: 5dvh;
    aspect-ratio: 2.1 / 3;
    
    @media (min-width: $xxs) {
      height: 130dvw;
      max-height: 600px;
    }
    
    @media (min-width: $m) {
      width: 65dvw;
      height: auto;
      aspect-ratio: 13/9;
      max-width: 1100px;
      max-height: auto;
    }
  }
  
  .table-cards {
    background-color: green;
    width: 55%;
    height: 80%;
    border-radius: 1000px;
    // outline: 5px solid #74461f;
    display: grid;

    grid-template: 
        'c1  c2  c3'
        'c4  t   c5'
        'c6  t   c7'
        'c8  t   c9'
        'c10 t   c11'
        'c12 t   c13'
        'c14 c15 c16'
    ;
    
    @media (min-width: $m) {
      width: 80%;
      height: 65%;
      gap: 2px;

      grid-template: 
          'c1  c2  c3  c4  c5  c6  c7'
          'c8  t   t   t   t   t   c9' 1fr
          'c10 c11 c12 c13 c14 c15 c16'
      ;
    
    }
  }

  .card-container {
    border: 1px solid yellow;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
      justify-content: end;
      align-items: end;
    }

    &:nth-child(3) {
      justify-content: start;
      align-items: end;
    }

    &:nth-child(14) {
      justify-content: end;
      align-items: start;
    }

    &:nth-child(16) {
      justify-content: start;
      align-items: start;
    }
    
    @media (min-width: $m) {
      &:nth-child(3) {
        justify-content: center;
        align-items: center;
      }

      &:nth-child(7) {
        justify-content: start;
        align-items: end;
      }
  
      &:nth-child(10) {
        justify-content: end;
        align-items: start;
      }

      &:nth-child(14) {
        justify-content: center;
        align-items: center;
      }
    } 
  }

  @for $i from 1 through 17 {
    .c-#{$i} {
      grid-area: c#{$i};

      @if $i > 3 and $i < 14 {
        width: 12dvw;

        @if $i % 2 != 0 {
          justify-self: end;
        }
      }

      @if $i == 1 {
        padding-bottom: 0;
        padding-right: 1.5dvw;
      }
      
      @if $i == 3 {
        padding-bottom: 0;
        padding-left: 1.5dvw;
      }
      
      @if $i == 14 {
        padding-top: 0;
        padding-right: 1.5dvw;
      }
      
      @if $i == 16 {
        padding-left: 1.5dvw;
        padding-top: 0;
      }
    }

    @media (min-width: $m) {
      .c-#{$i} {
        justify-self: auto;
        width: auto;
        padding: 0;

        @if $i > 1 and $i < 7 or $i > 10 and $i < 16 {
          height: 7dvw;
          max-height: 6.5rem;
        }

        @if $i == 1 or $i == 7 or $i == 10 or $i == 16 {
          height: 9dvw;
          max-height: 8.5rem;
        }

        @if $i == 8 or $i == 9 {
          min-height: 5dvh;
        }

        @if $i == 2 or $i == 6  {
          align-items: end;
        }

        @if $i == 11 or $i == 15 {
          align-items: start;
        }
        
        @if $i > 10 and $i < 16 {
          align-self: end;
        }

        @if $i == 1 {
          padding-right: 0;
          padding-left: 1rem;
        }


        @if $i == 2 {
            padding-bottom: 0.5rem;
            padding-left: 1rem;
          }
  
          @if $i == 6 {
            padding-bottom: 0.5rem;
            padding-right: 1rem;
          }

          @if $i == 11 {
            padding-top: 0.5rem;
            padding-left: 1rem;
          }
  
          @if $i == 15 {
            padding-top: 0.5rem;
            padding-right: 1rem;
          }

        @media (max-height: $m) {
          @if $i > 1 and $i < 7 or $i > 10 and $i < 16 {
            height: 12dvh;
            max-height: 6.5rem;
          }

          @if $i == 1 or $i == 7 or $i == 10 or $i == 16 {
            height: 12dvh;
            max-height: 8.5rem;
          }

          @if $i == 2 {
            padding-bottom: 0.2rem;
            padding-left: 0;
          }
          
          @if $i == 6 {
            padding-bottom: 0.2rem;
            padding-right: 0;
          }

          @if $i == 11 {
            padding-top: 0.2rem;
            padding-left: 0;
          }
  
          @if $i == 15 {
            padding-top: 0.2rem;
            padding-right: 0;
          }
        }


        @if $i == 16 {
          padding-left: 0;
          padding-right: 1rem;
        }
      }
    }
  }
  
  .card-item {
    width: 4dvw;
    max-width: 25px;
    aspect-ratio: 2/3;
    border: 1px solid white;
    border-radius: 2px;
    
    @media (min-width: $xxs) {
      width: 5dvw;
    }
    
    @media (min-width: $m) {
      width: 2.5dvw;
      max-width: none;
    }
  }
  
  .table-item {
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    grid-area: t;
  }
</style>  