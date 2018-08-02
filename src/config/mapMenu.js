import React from 'react';
import menus from '../mock/menu';
import {Link} from 'react-router-dom';
function createMenu(menus) {
     menus.map(menu=>{
        if(menu.routes){
            createMenu(menu.routes);
        }else {
            menu.name = <Link to={menu.path}>{menu.name}</Link>;
            menu.component = <Link to={menu.path}>{menu.name}</Link>;
        }
    });
}
createMenu(menus);
export default menus;
