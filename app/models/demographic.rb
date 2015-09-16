class Demographic < ActiveRecord::Base
	validates :state, uniqueness: false, presence: true
	validates :age, uniqueness: false, presence: true
	validates :race, uniqueness: false, presence: true
	validates :ethnicity, uniqueness: false, presence: true
	validates :sex, uniqueness: false, presence: true
	validates :year, uniqueness: false, presence: true

  has_many :figures, dependent: :destroy
  has_many :deaths, through: :figures 
end
