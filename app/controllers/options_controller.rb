class OptionsController < ApplicationController
  def index
  	@q = Figure.ransack(params[:q])
  	@figures = @q.result.includes(:deaths)

  	@deaths = Death.all
  	@demographics = Demographic.all 
  	
  end

  def show
  	@dem = Demographic.find_by_id(3000)
  end

end
