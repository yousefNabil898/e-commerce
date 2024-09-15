import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wishlistChecker',
  standalone: true
})
export class WishlistCheckerPipe implements PipeTransform {

  transform(products: any[], wishlist: any[]): any[] {
    if (!products || !wishlist) return products;

    return products.map(product => {
      const isInWishlist = wishlist.some(wishItem => wishItem._id === product._id);
      return {
        ...product,
        isWishList: isInWishlist
      };
    });
  }

}
