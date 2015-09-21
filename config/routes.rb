Rails.application.routes.draw do
 root 'options#show'
  get 'demographics/index' => 'demographics#index', as: "demographics"

 

  get 'options/index' =>'options#index'
  get 'display' =>'options#show'
end
