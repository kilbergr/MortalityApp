Rails.application.routes.draw do
 root 'demographics#index'
  get 'demographics/index' => 'demographics#index', as: "demographics"

 

  get 'options/index' =>'options#index'
  get 'display' =>'options#show'
end
