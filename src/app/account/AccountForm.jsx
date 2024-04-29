'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Avatar from './avatar'
import Banner from './Banner'

export default function AccountForm({ user }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState(null)
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [banner_url, setBannerUrl] = useState(null)


    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`name, username, avatar_url, banner_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFullname(data.name)
                setUsername(data.username)
                setAvatarUrl(data.avatar_url)
                setBannerUrl(data.banner_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({ username, avatar_url, banner_url }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id,
                name: fullname,
                username,
                avatar_url,
                banner_url,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <Banner
                uid={user?.id}
                url={banner_url}
                size={250}
                onUpload={(url) => {
                    setBannerUrl(url)
                    updateProfile({ fullname, username, banner_url: url })
                }}
            />
            <Avatar
                uid={user?.id}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ fullname, username, avatar_url: url })
                }}
            />
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={user?.email} disabled />
            </div>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {/* <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div> */}

            <div>
                <button
                    className="button primary block"
                    onClick={() => updateProfile({ fullname, username, avatar_url, banner_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className="button block" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}