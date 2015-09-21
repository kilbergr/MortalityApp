class DemographicsController < ApplicationController
 	before_filter :set_search
 
  def index
  	@demographics = @search.result
  end

	def set_search
	@search=Demographic.search(params[:q])
	end

end
