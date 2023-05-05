export const getPrice = (size: string, toppings: number) => {
        let price: number;
        if (size === 'small') {
          price = 8;
        } else if (size === 'medium') {
          price = 10;
        } else if (size === 'large') {
          price = 12;
        } else {
          price = 0;
        }
        
        if (toppings > 3) {
          price += (toppings - 3) * 0.5 + 3;
        } else {
          price += toppings;
        }
        
        return price;
      };

