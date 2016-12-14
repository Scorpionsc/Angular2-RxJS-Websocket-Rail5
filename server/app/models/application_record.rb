class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.serialize_all( items )
    result = []

    items.each do | item |
      result << self.serialize( item )
    end

    result

  end
end
