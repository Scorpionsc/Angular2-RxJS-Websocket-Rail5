class Message < ApplicationRecord

  def self.serialize( message )
    {
        id: message.id,
        text: message.text,
        name: message.name,
        created_at: message.created_at.to_i
    }
  end

end
