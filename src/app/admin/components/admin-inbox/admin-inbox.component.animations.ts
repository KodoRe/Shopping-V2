import { trigger, transition, state, animate, style, keyframes, animation, useAnimation, query, animateChild } from "@angular/animations";

export const expandCollapse = trigger('expandCollapse', [
    state('collapsed', style({
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0
    })),
  
    transition('collapsed => expanded', [
      animate('300ms ease-out', style({
        height: '*',
        paddingTop: '*',
        paddingBottom: '*'// check if can delete
      })),
      animate('1s', style({ opacity: 1 }))
    ]),
  
    transition('expanded => collapsed', [
      animate('300ms ease-in')
    ])
  ]);
  
   let bounceOutRightAnimation = animation(
    animate('0.5s ease-out', keyframes([
      style({ 
        offset: .2, 
        opacity: 1,
        transform: 'translateX(-20px)' 
      }),
      style({ 
        offset: 1, 
        opacity: 0,
        transform: 'translateX(+100%)' 
      }),
  ])));

  export const slideOut = trigger('slideOut', [
    transition(':leave', [
     style({ backgroundColor: '#34961E' }),
     animate(500),
    useAnimation(bounceOutRightAnimation)
    ])
]);