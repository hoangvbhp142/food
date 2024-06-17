import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
    return (
        <div className='menu' id='menu'>
          <h1>Explore Our Menu</h1>
          <p className='explore-menu-text'>The menu offers a diverse and extensive selection, ranging from locally inspired dishes to finely crafted international cuisine. Each dish is prepared using the freshest ingredients and executed with precision by a team of dedicated and skilled chefs.</p>
          <div className="explore-menu-list">
            {menu_list.map((item, i) => {
                return (
                    <div onClick={() => setCategory((prev) => prev===item.menu_name?"All":item.menu_name)} key={i} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
          </div>
          <hr />
        </div>
      )
}

export default ExploreMenu
