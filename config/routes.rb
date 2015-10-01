Rails.application.routes.draw do
 root 'options#show'
  get 'demographics/index' => 'demographics#index', as: "demographics"
  get 'demographics/json' => 'demographics#json', as: "json"
 

  get 'options/index' =>'options#index'
  get 'display' =>'options#show'
end
